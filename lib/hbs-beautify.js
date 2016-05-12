'use babel';

import HbsBeautifyView from './hbs-beautify-view';
import {
    CompositeDisposable
} from 'atom';

export default {

    hbsBeautifyView: null,
    modalPanel: null,
    subscriptions: null,
    config: {
        _indentSize: {
            title: 'Indent Size',
            type: 'integer',
            default: 4,
            description: "Set indent size"
        }
    },

    activate(state) {
        this.hbsBeautifyView = new HbsBeautifyView(state.hbsBeautifyViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.hbsBeautifyView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hbs-beautify:beautify': () => this.beautify()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.hbsBeautifyView.destroy();
    },

    serialize() {
        return {
            hbsBeautifyViewState: this.hbsBeautifyView.serialize()
        };
    },

    beautify() {
        editor = atom.workspace.getActivePaneItem();
        var beautify = require('js-beautify').html;
        editor.setText(beautify(editor.getText(), {
            indent_size: atom.config.get('hbs-beautify._indentSize'),
            indent_handlebars: true,
            // beautify_on_save: false,
            brace_style: "collapse",
            // default_beautifier: "JS Beautify",
            // disabled: false,
            end_with_newline: false,
            extra_liners: ["head", "body", "/html"],
            indent_char: " ",
            indent_handlebars: true,
            indent_inner_html: false,
            indent_scripts: "keep",
            indent_size: 4,
            indent_with_tabs: false,
            max_preserve_newlines: 10,
            preserve_newlines: true,
            unformatted: ["img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "g", "small", "u", "s", "strike", "font", "ins", "del", "pre", "address", "dt", "h1", "h2", "h3", "h4", "h5", "h6", "h5", "h6"],
            wrap_attributes: "auto",
            wrap_attributes_indent_size: 4,
            wrap_line_length: 80
        }))
    }
};
