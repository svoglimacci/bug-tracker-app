import Session from './Session';
import User from './User';
import Project from './Project';
import Membership from './Membership';
import Issue from './Issue';
import Note from './Note';

User.hasMany(Session);
Session.belongsTo(User);

Project.hasMany(Issue);
Issue.belongsTo(Project);

Issue.hasMany(Note);
Note.belongsTo(Issue);

User.belongsToMany(Project, { through: Membership });
Project.belongsToMany(User, { through: Membership });

export { Project, Session, User, Membership, Issue, Note };
