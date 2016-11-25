var TabbedForm;
(function (TabbedForm_1) {
    var TabbedForm = (function () {
        function TabbedForm() {
        }
        TabbedForm.prototype.Init = function () {
            var _this = this;
            var config = {
                OnPreRender: function (ctx) { return _this.PreRender(ctx); }
            };
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(config);
        };
        TabbedForm.prototype.PreRender = function (ctx) {
            if (!$("#myTabbedForm").length) {
                window.console.log("OnPreRender event");
                var form = $("<div id='myTabbedForm'><ul><li><a href='#tab-invoice'>Invoice</a></li><li><a href='#tab-supplier'>Supplier</a></li><li><a href='#tab-other'>Other</a></li></ul></div>");
                var tabs = [$("<div id='tab-invoice'></div>"), $("<div id='tab-supplier'></div>"), $("<div id='tab-other'></div>")];
                var tables = [$("<table id='table-invoice' class='ms-formtable'></table>"), $("<table id='table-supplier' class='ms-formtable'></table>"), $("<table id='table-other' class='ms-formtable'></table>")];
                for (var i = 0; i < 3; i++) {
                    tabs[i].append(tables[i]);
                    form.append(tabs[i]);
                }
                $(".ms-formtable").hide();
                $(".ms-formtable").before(form);
                $("#myTabbedForm").tabs();
                $("head").append("<link rel='stylesheet' type='text/css' href='/sites/msfest/scripts/jquery/themes/base/jquery-ui.css'>");
            }
            var tr = $("#" + ctx.FormUniqueId + ctx.FormContext.listAttributes.Id + ctx.ListSchema.Field[0].Name).parents("tr").first().detach();
            var table;
            if (ctx.ListSchema.Field[0].Name.indexOf("s_invoice") == 0 || ctx.ListSchema.Field[0].Name == "Title")
                table = "#table-invoice";
            else if (ctx.ListSchema.Field[0].Name.indexOf("s_supplier") == 0)
                table = "#table-supplier";
            else
                table = "#table-other";
            if ($(table + ">tr:last").length)
                $(table + ">tr:last").after(tr);
            else
                $(table).append(tr);
        };
        return TabbedForm;
    }());
    var form = new TabbedForm();
    SP.SOD.executeOrDelayUntilScriptLoaded(function () { return form.Init(); }, "ClientTemplates.js");
    console.log("form script loaded");
})(TabbedForm || (TabbedForm = {}));
//# sourceMappingURL=TabbedForm.js.map