const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;

    return fullname;
  }
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("author_lifespan").get(function () {
  let formattedDateOfBirth;
  let formattedDateOfDeath;
  this.date_of_birth
    ? (formattedDateOfBirth = DateTime.fromJSDate(
        this.date_of_birth
      ).toLocaleString(DateTime.DATE_MED))
    : (formattedDateOfBirth = "");
  this.date_of_death
    ? (formattedDateOfDeath = DateTime.fromJSDate(
        this.date_of_death
      ).toLocaleString(DateTime.DATE_MED))
    : (formattedDateOfDeath = "");

  return `${formattedDateOfBirth}-${formattedDateOfDeath}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
