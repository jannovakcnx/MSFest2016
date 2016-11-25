var SimpleView;
(function (SimpleView_1) {
    var SimpleView = (function () {
        function SimpleView() {
        }
        SimpleView.prototype.Init = function () {
            var _this = this;
            var conf = {
                Templates: {
                    Header: function (ctx) { return _this.RenderHeader(ctx); },
                    Footer: function (ctx) { return _this.RenderFooter(ctx); },
                    Item: function (ctx) { return _this.RenderItem(ctx); }
                }
            };
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(conf);
        };
        SimpleView.prototype.RenderHeader = function (ctx) {
            return "<h2 style='margin-bottom: 15px;'>Invoice overview</h2>";
        };
        SimpleView.prototype.RenderFooter = function (ctx) {
            var total = 0;
            for (var i = 0; i < ctx.ListData.Row.length; i++) {
                total += parseInt(ctx.ListData.Row[i]["s_amountWithoutVat"]);
            }
            return "<div>Total: <b> " + total + " </b></div>";
        };
        SimpleView.prototype.RenderItem = function (ctx) {
            return "<div style='margin-bottom: 10px;'><h3>" + ctx.CurrentItem["Title"] + "</h3><div>Ammount: <b>" + ctx.CurrentItem["s_amountWithoutVat"] + "</b></div></div>";
        };
        return SimpleView;
    }());
    var view = new SimpleView();
    SP.SOD.executeOrDelayUntilScriptLoaded(function () { return view.Init(); }, "ClientTemplates.js");
    console.log("view script loaded");
})(SimpleView || (SimpleView = {}));
//# sourceMappingURL=SimpleView.js.map