import mongoose from "mongoose";

// Couche de typage TS pour créer un User correctement
// Le but est d'avoir des vrais types TS et non pas juste mongoose
interface UserAttrs {
	email: string;
	password: string;
}

// Décrit les properties qu'un User Model a :
interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// On envoie ensuite notre interface dans cette fonction
// const buildUser = (attrs: UserAttrs) => {
// 	return new User(attrs);
// }
// Sauf qu'en fait, on peut ajouter une "méthode" directement sur le Schema
// Et éviter ainsi un export supplémentaire

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
}

// en JS on aurait déjà pu faire User.build() mais pas en TS


const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };