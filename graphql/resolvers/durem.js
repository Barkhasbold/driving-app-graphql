const mongoose = require('mongoose');
const Durem = mongoose.model('Durem');
const DuremCategory = mongoose.model('DuremCategory');

const {
  transformDurem,
  transformDuremCategory
} = require('./merge');

module.exports = {
  duremQueryResolver: {
    duremuud: async (parent, args, context, info) => {
      try {
        const duremuud = await Durem.find();
        return duremuud.map(durem => transformDurem(durem));
      } catch (err) {
        throw err;
      }
    },
    duremcategorys: async (parent, args, context, info) => {
      try {
        const duremcategorys = await DuremCategory.find();
        return duremcategorys.map(duremCategory => transformDuremCategory(duremCategory));
      } catch (err) {
        throw err;
      }
    }
  },
  duremMutationResolver: {
    
    createDuremCategory: async (parent, args, context, info) => {
      try {
        const duremCategory = new DuremCategory({
          name: args.name,
          durmuud: []
        });

        const result = await duremCategory.save();
        return transformDuremCategory(result);
      
      } catch (err) {
        throw err;
      }
    },

    addDurem: async (parent, args, context, info) => {
      try {
        const durem = new Durem({
          title: args.durem.title,
          description: args.durem.description,
          image: args.durem.image,
          category: null
        });

        const addDuremCategory = await DuremCategory.findById(args.duremCategoryId);
        if (!addDuremCategory) throw new Error("category not exists");

        durem.category = addDuremCategory._id;

        const result = await durem.save();
        addDuremCategory.durmuud.push(result._id);
        await addDuremCategory.save();
        
        return transformDurem(result);
      
      } catch (err) {
        throw err;
      }
    },
    removeDurem: async (parent, args, context, info) => {
      try {

        const result = await Durem.findByIdAndDelete(args.duremId);
        return transformDurem(result);

      } catch (err) {
        throw err;
      }
    },
  }
};