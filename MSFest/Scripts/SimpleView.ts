module SimpleView
{
    class SimpleView
    {
        Init(): void
        {
            var conf: SPClientTemplates.TemplateOverridesOptions = {
                Templates: {
                    Header: (ctx) => this.RenderHeader(ctx),
                    Footer: (ctx) => this.RenderFooter(ctx),
                    Item: (ctx: SPClientTemplates.RenderContext_ItemInView) => this.RenderItem(ctx)
                }
            };
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(conf);
        }

        RenderHeader(ctx: SPClientTemplates.RenderContext_InView): string
        {
            return "<h2 style='margin-bottom: 15px;'>Invoice overview</h2>";
        }

        RenderFooter(ctx: SPClientTemplates.RenderContext_InView): string {
            var total = 0;
            for (var i = 0; i < ctx.ListData.Row.length; i++)
            {
                total += parseInt(ctx.ListData.Row[i]["s_amountWithoutVat"]);
            }
            
            return "<div>Total: <b> " + total + " </b></div>";
        }

        RenderItem(ctx: SPClientTemplates.RenderContext_ItemInView): string {
            return "<div style='margin-bottom: 10px;'><h3>" + ctx.CurrentItem["Title"] + "</h3><div>Ammount: <b>" + ctx.CurrentItem["s_amountWithoutVat"]  + "</b></div></div>";
        }
    }

    var view = new SimpleView();
    SP.SOD.executeOrDelayUntilScriptLoaded(() => view.Init(), "ClientTemplates.js");
    console.log("view script loaded"); 
}