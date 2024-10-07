import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import ActionPopup from "../components/ActionPopup";
import Uploader from "../components/Uploader";
import Header from "../components/Header";
import "../css/AddBlog.css";

interface BlogInput {
  id?: string;
  headline: string;
  author: string;
  imageUrl?: File | null;
  sections: {
    subheading: string;
    content: string;
  }[];
}

const AddEditBlog = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [existingBlog, setExistingBlog] = useState<BlogInput | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [showImageError, setShowImageError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("error");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<BlogInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/blogs/${id}`);
          const blog = response.data;
          setExistingBlog(blog);
          setValue("headline", blog.headline);
          setValue("author", blog.author);
          setValue("sections", blog.sections);
          setDefaultImage(blog.imageUrl);
          setImage(null);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const handleImageChange = (file: File | null) => {
    setImage(file);
    setShowImageError(false);
  };

  const validateForm = async () => {
    const isValid = await trigger();
    let hasError = false;

    if (!image && !defaultImage) {
      setShowImageError(true);
      hasError = true;
    } else {
      setShowImageError(false);
    }

    if (!isValid || hasError) {
      setPopupMessage("Please fix the errors in the form");
      setPopupType("error");
      setShowPopup(true);
    }

    return isValid && !hasError;
  };

  async function onBlogSubmit(input: BlogInput) {
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("headline", input.headline);
      formData.append("author", input.author);
      formData.append("sections", JSON.stringify(input.sections));
      if (image) {
        formData.append("imageUrl", image);
      }

      if (existingBlog) {
        await axios.put(`/api/blogs/${existingBlog.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onBlogSave("Blog updated successfully!");
      } else {
        await axios.post("/api/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onBlogSave("Blog added successfully!");
      }
    } catch (error) {
      console.error(error);
      onBlogSaveError("Failed to save blog");
    }
  }

  async function onBlogSave(message: string) {
    navigate("/admin/blogs", {
      state: { showPopup: true, message, type: "success" },
    });
  }

  async function onBlogSaveError(message: string) {
    navigate("/admin/blogs", {
      state: { showPopup: true, message, type: "error" },
    });
  }

  return (
    <>
     <Header />
      <section className="page-layout">
        <div className="add-items">
          <h1>{existingBlog ? "Edit Blog" : "Add New Blog"}</h1>
          <form
            id="addEditBlogForm"
            onSubmit={handleSubmit(onBlogSubmit)}
            className="form-container"
            encType="multipart/form-data"
          >
            <Uploader
              setImage={setImage}
              onImageChange={handleImageChange}
              image={image}
              setDefaultImage={setDefaultImage}
              defaultImage={defaultImage}
              showError={showImageError}
            />
            <div className="input-row">
  <div className="input-box-container">
    <div className="title-container">
      <span className="title">Headline</span>
      <span className="required">*</span>
    </div>
    <div
      className={`input-box ${
        errors.headline ? "invalid" : dirtyFields.headline ? "valid" : ""
      }`}
    >
      <input
        type="text"
        {...register("headline", { required: "Headline is required" })}
        autoComplete="off"
      />
      {errors.headline && (
        <p className="error-message">{errors.headline.message}</p>
      )}
    </div>
  </div>

  <div className="input-box-container">
    <div className="title-container">
      <span className="title">Author</span>
      <span className="required">*</span>
    </div>
    <div
      className={`input-box ${
        errors.author ? "invalid" : dirtyFields.author ? "valid" : ""
      }`}
    >
      <input
        type="text"
        {...register("author", { required: "Author is required" })}
        autoComplete="off"
      />
      {errors.author && (
        <p className="error-message">{errors.author.message}</p>
      )}
    </div>
  </div>
</div>

            <div className="subsection-container">
              {fields.map((section, index) => (
                <div key={section.id}>
                  <div className="input-box-container">
                    <div className="title-container">
                      <span className="title">Subheading {index + 1}</span>
                      <span className="required">*</span>
                    </div>
                    <input
                      type="text"
                      {...register(`sections.${index}.subheading`, {
                        required: "Subheading is required",
                      })}
                      defaultValue={section.subheading}
                    />
                    {errors.sections?.[index]?.subheading && (
                      <p className="error-message">
                        {errors.sections[index].subheading.message}
                      </p>
                    )}
                  </div>
                  <div className="input-box-container">
                    <div className="title-container">
                      <span className="title">Content {index + 1}</span>
                      <span className="required">*</span>
                    </div>
                    <textarea
                      {...register(`sections.${index}.content`, {
                        required: "Content is required",
                      })}
                      defaultValue={section.content}
                    ></textarea>
                    {errors.sections?.[index]?.content && (
                      <p className="error-message">
                        {errors.sections[index].content.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="add-button"
              onClick={() => append({ subheading: "", content: "" })}
            >
              + Add Subheading & Content
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Saving..." : "Save Blog"}
            </button>
          </form>
        </div>
      </section>
      <ActionPopup
        show={showPopup}
        message={popupMessage}
        type={popupType}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default AddEditBlog;
