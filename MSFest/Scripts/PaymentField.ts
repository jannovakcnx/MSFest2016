module PaymentField
{
    class PaymentField
    {
        Init(): void
        {                 
            var conf: SPClientTemplates.TemplateOverridesOptions = {
                Templates: {
                    Fields: {
                        "s_Payment": {
                            DisplayForm: (ctx) => this.RenderField(ctx),
                            View: (ctx) => this.RenderFieldView(ctx) 
                        }
                    }                    
                }
            };
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(conf);
        }

        RenderField(ctx: SPClientTemplates.RenderContext_FieldInForm): string
        {
            window.console.log("Rendering payment");
            return this.RenderColoredField(ctx.CurrentFieldValue, ctx.CurrentItem["s_amountWithoutVat"]);
        }

        RenderFieldView(ctx: SPClientTemplates.RenderContext_FieldInView): string
        {
            window.console.log("Rendering payment in view");
            return this.RenderColoredField(ctx.CurrentItem["s_Payment"], ctx.CurrentItem["s_amountWithoutVat"]);
        }

        RenderColoredField(value, refValue): string
        {
            var color = "red";
            if (parseInt(value) >= parseInt(refValue))
                color = "green";

            return "<div style='background-color: " + color + "; color:white; padding:3px;'>" + (value ? value : "0") + "</div>";
        }
    }

    var field = new PaymentField();
    SP.SOD.executeOrDelayUntilScriptLoaded(() => field.Init(), "ClientTemplates.js");
    console.log("field script loaded");
}