// import getLyrics from '../../client/src/genius/getLyrics.js';
// import getSong from '../../client/src/genius/getSong.js';
// //import searchSong from '../../client/src/genius/searchSong.js';
// import songById from '../../client/src/genius/songById.js';
// import sequelize from '../config/connection.js';
// import User from './user.js';
//import Song from './song.js';
//User.hasMany(Song, { foreignKey: 'userId' });
//Song.belongsTo(User, { foreignKey: 'userId' });

import User from './user.js';
import Song from './song.js';
import Post from './post.js';
import Comment from './comment.js';

Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasOne(Song, { foreignKey: 'songId' });
Song.belongsTo(Post, { foreignKey: 'songId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
User.hasMany(Comment, { foreignKey: 'userId' });

const models = { User, Song, Post };

export default models;


// export default { User };
// export { getLyrics };
// export {getSong};
// export {searchSong};
// export {songById};