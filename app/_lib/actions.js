"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "../api/auth/[...nextauth]/route";
import { createBooking, getGuest, updateBooking, updateGuest } from "./data-service";
import supabase from "./supabase";
import { redirect } from "next/navigation";

export async function SignInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function SignOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function handleUpdateProfileForm(formData) {
  const session = await auth();
  const guestInfo = await getGuest(session.user.email);
  const { id } = guestInfo;

  const formDataObj = {};
  for (let [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  const [nationality, countryFlag] = formDataObj.nationality.split("%");

  const updatedFormDataObj = {
    ...formDataObj,
    nationality,
    countryFlag,
  };

  const { nationalID } = updatedFormDataObj;
  await updateGuest(id, { nationality, nationalID, countryFlag });

  revalidatePath("/account/profile");
}

export async function handleDeleteBooking(bookingId) {
  const session = await auth();
  if (!session.user) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/bookings");
}

export async function handleEditBooking(formData) {
  const formDataObj = {};
  for (let [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  const { editId: id, numGuests, observations } = formDataObj;

  await updateBooking(id, { numGuests, observations });

  revalidatePath(`/account/bookings/edit/${id}`);
  revalidatePath("/account/bookings");

  redirect("/account/bookings");
}

export async function handleCreateBooking(bookingData,formData){

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestInfo = await getGuest(session.user.email);
  const { id } = guestInfo;

  const formDataObj = {};
  for (let [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  const newBooking = {
    ...bookingData,
    guestId: id,
    numGuests: formDataObj.numGuests,
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou")
}
