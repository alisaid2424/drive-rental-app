"use client";

import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { UpdateUserType } from "@/zod-schemas/user";

const rolesData = [
  { id: "USER", name: "User" },
  { id: "ADMIN", name: "Admin" },
];

export const UserInputFields = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-6">
        <InputWithLabel<UpdateUserType>
          fieldTitle="Full Name"
          nameInSchema="fullName"
          autoComplete="off"
          className="mt-1.5 px-4 py-5 rounded-xl"
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <InputWithLabel<UpdateUserType>
          fieldTitle="Email Address"
          nameInSchema="email"
          type="email"
          autoComplete="off"
          className="mt-1.5 px-4 py-5 rounded-xl"
          readOnly
        />
      </div>

      <div className="col-span-12">
        <TextAreaWithLabel<UpdateUserType>
          fieldTitle="Bio / Professional Summary"
          nameInSchema="bio"
          rows={4}
          className="mt-1.5 min-h-20 p-4 resize-none rounded-xl"
        />
      </div>

      <div className="col-span-12 md:col-span-4">
        <SelectWithLabel<UpdateUserType>
          fieldTitle="Role"
          nameInSchema="role"
          data={rolesData}
          className="mt-1.5 px-4 py-5 rounded-xl"
        />
      </div>

      <div className="col-span-12 md:col-span-4">
        <InputWithLabel<UpdateUserType>
          fieldTitle="Phone Number"
          nameInSchema="phone"
          type="tel"
          autoComplete="off"
          className="mt-1.5 px-4 py-5 rounded-xl"
        />
      </div>

      <div className="col-span-12 md:col-span-4">
        <InputWithLabel<UpdateUserType>
          fieldTitle="Timezone"
          nameInSchema="timezone"
          readOnly
          className="mt-1.5 px-4 py-5 rounded-xl"
        />
      </div>
    </div>
  );
};
