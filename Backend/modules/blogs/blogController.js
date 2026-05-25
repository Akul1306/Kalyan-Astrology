import Blog from "./blogModel.js";

// @desc    Create new blog
// @route   POST /api/blogs
export const createBlog = async (req, res, next) => {
  try {
    if (req.body.content) {
      const wordCount = req.body.content.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 1000) {
        return res.status(400).json({
          status: "fail",
          message: `Validation Error: Blog content cannot exceed 1000 words. (Currently ${wordCount} words)`,
        });
      }
    }
    const newBlog = await Blog.create({
      ...req.body,
      authorId: req.user._id,
      author: req.user.name,
    });

    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "No blog found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a blog
// @route   PATCH /api/blogs/:id
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "No blog found with that ID",
      });
    }

    // Check authorization: Admin cannot edit the blog, only delete it. Only the owner can edit.
    const isOwner = blog.authorId && blog.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user && req.user.role === "admin";

    if (!isOwner) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to update this blog. Only the author can edit it.",
      });
    }

    if (req.body.content) {
      const wordCount = req.body.content.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 1000) {
        return res.status(400).json({
          status: "fail",
          message: `Validation Error: Blog content cannot exceed 1000 words. (Currently ${wordCount} words)`,
        });
      }
    }

    // Don't allow standard users to change authorId or author name
    const updateData = { ...req.body };
    if (!isAdmin) {
      delete updateData.authorId;
      delete updateData.author;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        blog: updatedBlog,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "No blog found with that ID",
      });
    }

    // Check authorization: Admin can delete anything, user can only delete their own blog
    const isOwner = blog.authorId && blog.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to delete this blog.",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
