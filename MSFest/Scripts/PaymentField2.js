var PaymentField;
(function (PaymentField_1) {
    var PaymentField = (function () {
        function PaymentField() {
        }
        PaymentField.prototype.Init = function () {
            var _this = this;
            var conf = {
                Templates: {
                    Fields: {
                        "s_Payment": {
                            DisplayForm: function (ctx) { return _this.RenderField(ctx); },
                            View: function (ctx) { return _this.RenderFieldView(ctx); },
                            NewForm: function (ctx) { return _this.RenderFieldEdit(ctx); },
                            EditForm: function (ctx) { return _this.RenderFieldEdit(ctx); }
                        }
                    }
                }
            };
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(conf);
        };
        PaymentField.prototype.RenderField = function (ctx) {
            window.console.log("Rendering payment");
            return this.RenderColoredField(ctx.CurrentFieldValue, ctx.CurrentItem["s_amountWithoutVat"]);
        };
        PaymentField.prototype.RenderFieldView = function (ctx) {
            window.console.log("Rendering payment in view");
            return this.RenderColoredField(ctx.CurrentItem["s_Payment"], ctx.CurrentItem["s_amountWithoutVat"]);
        };
        PaymentField.prototype.RenderColoredField = function (value, refValue) {
            var color = "red";
            if (parseInt(value) >= parseInt(refValue))
                color = "green";
            return "<div style='background-color: " + color + "; color:white; padding:3px;'>" + (value ? value : "0") + "</div>";
        };
        PaymentField.prototype.RenderFieldEdit = function (ctx) {
            var _this = this;
            window.console.log("Rendering payment in edit mode");
            ctx.FormContext.registerGetValueCallback(ctx.CurrentFieldSchema.Name, function () { return _this.GetValue(); });
            ctx.FormContext.registerValidationErrorCallback(ctx.CurrentFieldSchema.Name, function (err) { return _this.SetErrorMessage(err); });
            var set = new SPClientForms.ClientValidation.ValidatorSet();
            set.RegisterValidator(new PaymentValidator());
            ctx.FormContext.registerClientValidator(ctx.CurrentFieldSchema.Name, set);
            return "<span><input type='number' id='sPayment_input' value='" + ctx.CurrentFieldValue + "' /><br/><span id='sPayment_Err' class='ms-formvalidation ms-csrformvalidation'></span></span>";
        };
        PaymentField.prototype.GetValue = function () {
            window.console.log("Payment value retreival");
            return $("#sPayment_input").val();
        };
        PaymentField.prototype.SetErrorMessage = function (err) {
            $("#sPayment_Err").html(err.errorMessage);
        };
        return PaymentField;
    }());
    var PaymentValidator = (function () {
        function PaymentValidator() {
        }
        PaymentValidator.prototype.Validate = function (value) {
            if (parseInt(value) > parseInt($("input[id^='s_amountWithoutVat']").val()))
                return new SPClientForms.ClientValidation.ValidationResult(true, "Customer paid too much.");
            return new SPClientForms.ClientValidation.ValidationResult(false, "");
        };
        return PaymentValidator;
    }());
    var field = new PaymentField();
    SP.SOD.executeOrDelayUntilScriptLoaded(function () { return field.Init(); }, "ClientTemplates.js");
    console.log("field script loaded (version 2)");
})(PaymentField || (PaymentField = {}));
//# sourceMappingURL=PaymentField2.js.map