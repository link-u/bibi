/*!
 *
 * # BiB/i Extension: Share
 *
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */

Bibi.x({

    name: "Shareandroid",
    description: "Share the webpage which is holding BiB/i or embedded books through SNS.",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: "2.0.0",
    build: Bibi["build"]

})(function() {
    if (sML.OS.Android) {
        var ShareButtonGroup = I.createButtonGroup({ Area: I.Menu.R, Sticky: true, Deactivate: true });

        // Share
        var ShareButton = ShareButtonGroup.addButton({
            Type: "toggle",
            Labels: {
                default: { default: 'Shareandroid', ja: 'シェア' },
                active:  { default: 'Close Share-Menu', ja: 'シェアメニューを閉じる' }
            },
            Help: true,
            Icon: '<span class="bibi-icon bibi-icon-share"></span>',
            action: function() {
                M.sendEventToNative('share');
            }
        });
    }
});
