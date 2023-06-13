"use strict";
/* Copyright © 2021 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {
    get_info: {
        desc: 'Get information about the provider.',
    },
    load_project: {
        desc: 'Load the Gitlab project data into an entity, through a project id informed as a parameter.',
    },
    save_project: {
        desc: 'Update Gitlab project data from an entity, through a project id, informed as a parameter.',
    },
};
const sections = {};
exports.default = {
    messages,
    sections
};
if ('undefined' !== typeof (module)) {
    module.exports = {
        messages,
        sections
    };
}
//# sourceMappingURL=GitlabProvider-doc.js.map