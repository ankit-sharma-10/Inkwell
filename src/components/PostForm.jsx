import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Input, RTE, Select } from "./index";
import dbService from "../appwrite/db";
import storageService from "../appwrite/storage";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, control, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const slugTransform = useCallback((value) => {
    if (typeof value !== "string") {
      return "";
    }

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const slug = slugTransform(value.title);

        setValue("slug", slug, {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      let dbPost;

      if (post) {
        let featuredImage = post.featuredImage;

        if (data.image?.[0]) {
          const file = await storageService.uploadFile(data.image[0]);

          if (file) {
            featuredImage = file.$id;

            if (post.featuredImage) {
              await storageService.deleteFile(post.featuredImage);
            }
          }
        }

        dbPost = await dbService.updatePost(post.slug, {
          title: data.title,
          content: data.content,
          featuredImage,
          status: data.status,
        });
      } else {
        if (!data.image?.[0]) {
          return;
        }

        const file = await storageService.uploadFile(data.image[0]);

        if (!file) {
          return;
        }

        dbPost = await dbService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: file.$id,
          status: data.status,
          userId: userData.$id,
        });
      }

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Post submission failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
          })}
        />

        {post && post.featuredImage && (
          <div className="mb-4 w-full">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
