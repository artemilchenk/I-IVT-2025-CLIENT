import { useAuth } from "@/modules/auth/context.ts";

export const ProfilePage = () => {
  const { getUserData } = useAuth();
  const userData = getUserData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="mt-2 text-gray-600">
        Firstname: {userData?.user.firstname}
      </p>
      <p className="mt-2 text-gray-600">Lastname: {userData?.user.lastname}</p>
      <p className="mt-2 text-gray-600">Email: {userData?.user.email}</p>
    </div>
  );
};
