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
                            View: function (ctx) { return _this.RenderFieldView(ctx); }
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
        return PaymentField;
    }());
    var field = new PaymentField();
    SP.SOD.executeOrDelayUntilScriptLoaded(function () { return field.Init(); }, "ClientTemplates.js");
    console.log("field script loaded");
})(PaymentField || (PaymentField = {}));
//# sourceMappingURL=PaymentField.js.map