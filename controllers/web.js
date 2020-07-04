
module.exports = {
    getWalletHtml: async(ctx) => {
        await ctx.render("walletnew.html")
    },
    
    getKeyListHtml:async(ctx) => {
        await ctx.render("keyList.html")
    },

    getAccountListHtml:async(ctx) => {
        await ctx.render("accountList.html")
    },

    getAccountInfoHtml:async(ctx) =>　{
        await ctx.render("accountInfo.html")
    },

    getAccountCreateHtml:async(ctx) =>　{
        await ctx.render("accountNewnew.html")
    },

    getTransactionHtml:async(ctx) =>　{
        await ctx.render("transaction.html")
    },

    getRamHtml:async(ctx) =>　{
        await ctx.render("ram.html")
    },

    getCpuHtml:async(ctx) =>　{
        await ctx.render("cpu.html")
    },

    getNetHtml:async(ctx) =>　{
        await ctx.render("net.html")
    },

    getVoteHtml:async(ctx) =>　{
        await ctx.render("vote.html")
    },

    getMnemonicHtml:async(ctx) =>　{
        await ctx.render("mnemonic.html")
    },

    getWelcomeHtml:async(ctx) =>　{
        await ctx.render("welcome.html")
    },

    getAboutHtml:async(ctx) =>　{
        await ctx.render("about.html")
    },
    
}