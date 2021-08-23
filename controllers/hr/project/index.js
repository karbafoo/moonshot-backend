const Project = require('./project.model');

const Make = (groups, name, color, tags, description) => {
    return new Promise((resolve, reject) => {
        const newProject = new Project({
            groups: groups,
            name: name,
            color: color,
            tags: tags,
            description: description,
        });
        newProject.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const Update = (name, groups, color, tags, description) => {
    return new Promise((resolve, reject) => {
        Project.findOne({
            name: name,
        }).then((doc) => {
            doc.set({
                ...(groups && groups.length ? {groups: groups} : {}),
                ...(color ? {color: color} : {}),
                ...(tags && tags.length ? {tags: tags} : {}),
                ...(description ? {description: description} : {}),
            });
            newGroup.save((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc.toObject());
                }
            });
        });
    });
};

const GetProjectByName = (name) => {
    return new Promise((resolve, reject) => {
        Project.find({name: name})
            .sort({created_at: -1})
            .lean()
            .then((projectDocs) => {
                resolve(projectDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const GetProjects = (color = '', tags = [], groups = []) => {
    return new Promise((resolve, reject) => {
        Project.find({
            ...(color ? {color: color} : {}),
            ...(tags && tags.length ? {tags: {$in: tags}} : {}),
            ...(groups && groups.length ? {groups: {$in: groups}} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((projectDocs) => {
                resolve(projectDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    Make,
    Update,
    GetProjectByName,
    GetProjects,
};
