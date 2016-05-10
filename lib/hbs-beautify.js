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
            indent_handlebars: true
        }))
    }
};
