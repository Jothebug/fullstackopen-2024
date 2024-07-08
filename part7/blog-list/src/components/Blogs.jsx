const Blogs = ({ blogs = [] }) => {
  return (
    <div>
      {blogs.map((blog, index) => (
        <div key={index}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  );
};
export default Blogs;
