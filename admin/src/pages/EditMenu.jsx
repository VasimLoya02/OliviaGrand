import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MenuForm from "../components/MenuForm";
import api from "../services/api";

function EditMenu() {

  const { id } = useParams();

  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [menuItem, setMenuItem] = useState(null);

  const [loading, setLoading] = useState(
    isEditMode
  );

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    if (isEditMode) {
      fetchMenuItem();
    }

  }, [id]);

  const fetchMenuItem = async () => {

    try {

      const response = await api.get(
        `/menu/${id}`
      );

      setMenuItem(
        response.data.data
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to load menu item"
      );

      navigate("/menu");

    } finally {

      setLoading(false);

    }

  };

  const handleSubmit = async (data) => {

    setSaving(true);

    try {

      if (isEditMode) {

        await api.put(
          `/menu/${id}`,
          data
        );

        alert(
          "Menu item updated successfully!"
        );

      } else {

        await api.post(
          "/menu",
          data
        );

        alert(
          "Menu item added successfully!"
        );

      }

      navigate("/menu");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to save menu item"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="bg-white rounded-xl p-8 text-center">
        Loading menu item...
      </div>

    );

  }

  return (

    <div>

      <div className="mb-7">

        <h1 className="text-2xl md:text-3xl font-bold text-[#2C211B]">

          {isEditMode
            ? "Edit Menu Item"
            : "Add Menu Item"}

        </h1>

        <p className="text-[#6B7355] mt-1">

          {isEditMode
            ? "Update restaurant menu item"
            : "Create a new restaurant menu item"}

        </p>

      </div>

      <MenuForm
        initialData={menuItem}
        onSubmit={handleSubmit}
        loading={saving}
        submitText={
          isEditMode
            ? "Update Menu Item"
            : "Add Menu Item"
        }
      />

    </div>

  );
}

export default EditMenu;