import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  // Check to see if the image path has the supabase URL
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // With any "/", supabase will create new folders, so we have to replace these
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // Image path is what will be stored in the cabin row
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://hslifazwknhzaqgradmx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create/edit cabin
  // This is a commonly used technique when you want to reuse parts of query
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // .single() will take the element out of the array it is in
  // B) EDIT
  if (id)
    query = query
      // Notice how here we do NOT have to place in an array
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin IF there was an error uploading
  // the corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded - cabin was NOT created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase
    // Delete from the cabins table where the "id" column equals the id passed into deleteCabin
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }
}
