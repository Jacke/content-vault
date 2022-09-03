"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNodeImplicitPropsEnum = exports.DNodeExplicitPropsEnum = void 0;
/**
 * Node property keys that are written to the frontmatter
 */
var DNodeExplicitPropsEnum;
(function (DNodeExplicitPropsEnum) {
    DNodeExplicitPropsEnum["id"] = "id";
    DNodeExplicitPropsEnum["title"] = "title";
    DNodeExplicitPropsEnum["desc"] = "desc";
    DNodeExplicitPropsEnum["updated"] = "updated";
    DNodeExplicitPropsEnum["created"] = "created";
    DNodeExplicitPropsEnum["config"] = "config";
    DNodeExplicitPropsEnum["color"] = "color";
    DNodeExplicitPropsEnum["tags"] = "tags";
    DNodeExplicitPropsEnum["traitIds"] = "traitIds";
    DNodeExplicitPropsEnum["image"] = "image";
})(DNodeExplicitPropsEnum = exports.DNodeExplicitPropsEnum || (exports.DNodeExplicitPropsEnum = {}));
/**
 * Node property keys that are not written to the frontmatter
 */
var DNodeImplicitPropsEnum;
(function (DNodeImplicitPropsEnum) {
    DNodeImplicitPropsEnum["fname"] = "fname";
    DNodeImplicitPropsEnum["parent"] = "parent";
    DNodeImplicitPropsEnum["children"] = "children";
    DNodeImplicitPropsEnum["body"] = "body";
    DNodeImplicitPropsEnum["data"] = "data";
    DNodeImplicitPropsEnum["schemaStub"] = "schemaStub";
    DNodeImplicitPropsEnum["type"] = "type";
    DNodeImplicitPropsEnum["custom"] = "custom";
    DNodeImplicitPropsEnum["links"] = "links";
})(DNodeImplicitPropsEnum = exports.DNodeImplicitPropsEnum || (exports.DNodeImplicitPropsEnum = {}));
//# sourceMappingURL=foundation.js.map