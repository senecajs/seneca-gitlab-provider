"use strict";
/* Copyright © 2021 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: namespace provider zone; needs seneca-entity feature
const node_1 = require("@gitbeaker/node");
function GitlabProvider(_options) {
    const seneca = this;
    const ZONE_BASE = 'provider/gitlab/';
    let gitlab;
    // NOTE: sys- zone prefix is reserved.
    seneca
        .message('sys:provider,provider:gitlab,get:info', get_info)
        .message('role:entity,cmd:load,zone:provider,base:gitlab,name:project', load_project)
        .message('role:entity,cmd:save,zone:provider,base:gitlab,name:project', save_project);
    async function get_info(_msg) {
        return {
            ok: true,
            name: 'gitlab',
            details: {
                sdk: '@gitbeaker/node'
            }
        };
    }
    async function load_project(msg) {
        let ent = null;
        let projectId = msg.q.id;
        let project = await gitlab.Projects.show(projectId);
        let data = project;
        data.id = project.id;
        ent = this.make$(ZONE_BASE + 'project').data$(data);
        return ent;
    }
    async function save_project(msg) {
        let ent = msg.ent;
        let data = {
            id: ent.id,
            description: ent.description
        };
        let project = await gitlab.Projects.edit(ent.id, data);
        let dataUpdated = project;
        dataUpdated.id = project.id;
        ent = this.make$(ZONE_BASE + 'project').data$(dataUpdated);
        return ent;
    }
    seneca.prepare(async function () {
        let out = await this.post('sys:provider,get:key,provider:gitlab,key:api');
        if (!out.ok) {
            this.fail('api-key-missing');
        }
        gitlab = new node_1.Gitlab({ token: out.value });
    });
    return {
        exports: {
            native: () => ({
                gitlab
            })
        }
    };
}
// Default options.
const defaults = {
    // TODO: Enable debug logging
    debug: false
};
Object.assign(GitlabProvider, { defaults });
exports.default = GitlabProvider;
if ('undefined' !== typeof (module)) {
    module.exports = GitlabProvider;
}
//# sourceMappingURL=gitlab-provider.js.map