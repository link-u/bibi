/*!
 *
 * # BiB/i Extension: Share
 *
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */

Bibi.x({

    name: "Share",
    description: "Share the webpage which is holding BiB/i or embedded books through SNS.",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: "2.0.0",
    build: Bibi["build"]

})(function() {
    if (sML.OS.iOS) {
        var ShareButtonGroup = I.createButtonGroup({ Area: I.Menu.R, Sticky: true });

        // Share
        var ShareButton = ShareButtonGroup.addButton({
            Type: "toggle",
            Labels: {
                default: { default: 'Share', ja: 'シェア' },
                active:  { default: 'Close Share-Menu', ja: 'シェアメニューを閉じる' }
            },
            Help: true,
            Icon: '<span class="bibi-icon bibi-icon-share"></span>'
        });

        // Share SubPanel
        var ShareSubPanel = I.createSubPanel({
            Opener: ShareButton,
            id: "bibi-subpanel_share",
            open: function() {
                sML.each(this.querySelectorAll(".parent-title"), function() {
                    this.innerHTML = U["parent-title"];
                });
                sML.each(this.querySelectorAll(".book-title"), function() {
                    this.innerHTML = document.title;
                });
            },
            getShareParameter: function(ParentOrBook, SNS) {
                var ShareTitle = "", ShareURI = "";
                switch(ParentOrBook) {
                    case "Parent": ShareTitle = U["parent-title"], ShareURI = U["parent-uri"]; break;
                    case "Book": ShareTitle = document.title,    ShareURI = O.ReadiedURL;    break;
                }
                switch(SNS) {
                    case "Twitter": return "share_twitter";
                    case "Facebook": return "share_facebook";
                    case "LINE": return "share_line";
                }
                return "";
            }
        });
        var getButtonObject = function(ParentOrBook, SNS, onclick) {
            switch(SNS) {
                case "LINE":
                  var ButtonObject = {
                      Type: "link",
                      Labels: { default: { default: SNS } },
                      Icon: '<img class="bibi-icon bibi-icon-' + SNS + '" alt="" src="' + O.RootPath + 'res/images/LINE_APP_typeA.png" />',
                      action: function() {
                          M.sendEventToNative('share_'+SNS.toLowerCase());
                      }
                  };
                  break;
                default:
                  var ButtonObject = {
                      Type: "link",
                      Labels: { default: { default: SNS } },
                      Icon: '<span class="bibi-icon bibi-icon-' + SNS + '"></span>',
                      action: function() {
                          M.sendEventToNative('share_'+SNS.toLowerCase());
                      }
                  };
                  break;
            }
            return ButtonObject;
        };
        if(U["parent-uri"]) {
            ShareSubPanel.addSection({
                Labels: { default: { default: 'Share the Embedded Webpage', ja: '埋め込まれたページをシェア' } },
                ButtonGroup: {
                    Tiled: true,
                    Buttons: [
                        getButtonObject("Parent", "Twitter"),
                        getButtonObject("Parent", "Facebook"),
                        getButtonObject("Parent", "LINE")
                    ]
                }
            }).querySelector(".bibi-h-label").appendChild(sML.create("small", { className: "parent-title" }));
        }
        if(true) {
            ShareSubPanel.addSection({
                Labels: { default: { default: 'Share This Book', ja: 'この本をシェア' } },
                ButtonGroup: {
                    Tiled: true,
                    Buttons: [
                        getButtonObject("Book", "Twitter"),
                        getButtonObject("Book", "Facebook"),
                        getButtonObject("Book", "LINE")
                    ]
                }
            }).querySelector(".bibi-h-label").appendChild(sML.create("small", { className: "book-title" }));
        }
        /*
        if(X.Presets.Share["allow-embedding-in-other-webpages"]) {
            var EmbedCode = [
                '<a href="' + O.RequestedURL + '" data-bibi="embed">' + (U["parent-bibi-label"] ? U["parent-bibi-label"] : document.title) + '</a>',
                '<script src="' + (U["parent-pipi-path"] ? U["parent-pipi-path"] : O.RootPath.replace(/\/$/, ".js")) + '"></script>'
            ].join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            ShareSubPanel.addSection({
                Labels: { default: { default: 'Embed-Code of This Book', ja: 'この本の埋め込みコード' } },
                Notes: [
                    { default: { default: '<input class="code block" value="' + EmbedCode.replace(/[""]/g, "&quot;") + '" onclick="this.select();" />' } }
                ]
            });
        }
        */
        O.Head.appendChild(sML.create("script", { async: "async", src: "//platform.twitter.com/widgets.js" }));
    }
});
