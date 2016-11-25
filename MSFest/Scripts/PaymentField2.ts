module PaymentField {
    class PaymentField {
        Init(): void {
            var conf: SPClientTemplates.TemplateOverridesOptions = {
                Templates: {
                    Fields: {
                        "s_Payment": {
                            DisplayForm: (ctx) => this.RenderField(ctx),
                            View: (ctx) => this.RenderFieldView(ctx),
                            NewForm: (ctx) => this.RenderFieldEdit(ctx),
                            EditForm: (ctx) => this.RenderFieldEdit(ctx)
                        }
                    }
                }
            };
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(conf);
        }

        RenderField(ctx: SPClientTemplates.RenderContext_FieldInForm): string {
            window.console.log("Rendering payment");
            return this.RenderColoredField(ctx.CurrentFieldValue, ctx.CurrentItem["s_amountWithoutVat"]);
        }

        RenderFieldView(ctx: SPClientTemplates.RenderContext_FieldInView): string {
            window.console.log("Rendering payment in view");
            return this.RenderColoredField(ctx.CurrentItem["s_Payment"], ctx.CurrentItem["s_amountWithoutVat"]);
        }

        RenderColoredField(value, refValue): string {
            var color = "red";
            if (parseInt(value) >= parseInt(refValue))
                color = "green";

            return "<div style='background-color: " + color + "; color:white; padding:3px;'>" + (value ? value : "0") + "</div>";
        }

        RenderFieldEdit(ctx: SPClientTemplates.RenderContext_FieldInForm): string {
            window.console.log("Rendering payment in edit mode");
            ctx.FormContext.registerGetValueCallback(ctx.CurrentFieldSchema.Name, () => { return this.GetValue() });
            ctx.FormContext.registerValidationErrorCallback(ctx.CurrentFieldSchema.Name, (err) => this.SetErrorMessage(err));

            var set = new SPClientForms.ClientValidation.ValidatorSet();
            set.RegisterValidator(new PaymentValidator());
            ctx.FormContext.registerClientValidator(ctx.CurrentFieldSchema.Name, set);
            
            return "<span><input type='number' id='sPayment_input' value='" + ctx.CurrentFieldValue + "' /><br/><span id='sPayment_Err' class='ms-formvalidation ms-csrformvalidation'></span></span>"
        }

        GetValue(): any {
            window.console.log("Payment value retreival");
            return $("#sPayment_input").val();
        }

        SetErrorMessage(err: any): void
        {
            $("#sPayment_Err").html(err.errorMessage);
        }        
    }

    class PaymentValidator implements SPClientForms.ClientValidation.IValidator
    {
        Validate(value: any): SPClientForms.ClientValidation.ValidationResult
        {
            if (parseInt(value) > parseInt($("input[id^='s_amountWithoutVat']").val()))
                return new SPClientForms.ClientValidation.ValidationResult(true, "Customer paid too much.")

            return new SPClientForms.ClientValidation.ValidationResult(false, "");
        }
    }

    var field = new PaymentField();
    SP.SOD.executeOrDelayUntilScriptLoaded(() => field.Init(), "ClientTemplates.js");
    console.log("field script loaded (version 2)");
}