require("dotenv").config();

const bcrypt = require("bcrypt");

const supabase = require("../config/supabase");
const ADMIN = {
  username: "admin",
  email: "admin@geokristine.com",
  password: "admin123",
  role: "admin",
};

const seedAdmin = async () => {
  try {
    console.log("========================================");
    console.log(" Geo & Kristine RSVP");
    console.log(" Admin Seeder");
    console.log("========================================");

    const { data: existingAdmin, error: fetchError } =
      await supabase
        .from("admins")
        .select("id")
        .eq("username", ADMIN.username)
        .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    if (existingAdmin) {
      console.log("✔ Admin account already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      ADMIN.password,
      10
    );

    const { error } = await supabase
      .from("admins")
      .insert({
        username: ADMIN.username,
        email: ADMIN.email,
        password: hashedPassword,
        role: ADMIN.role,
      });

    if (error) {
      throw error;
    }

    console.log("✔ Admin account created successfully.");
    console.log("----------------------------------------");
    console.log(`Username : ${ADMIN.username}`);
    console.log(`Email    : ${ADMIN.email}`);
    console.log(`Password : ${ADMIN.password}`);
    console.log("----------------------------------------");
    console.log("Please change the password after your first login.");

    process.exit(0);
  } catch (error) {
    console.error("Seeder Error:");
    console.error(error.message);

    process.exit(1);
  }
};

seedAdmin();