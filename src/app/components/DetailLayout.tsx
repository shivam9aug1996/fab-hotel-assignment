import Back from "./Back";

const DetailLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div>
    <Back />
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-2xl rounded-lg border border-gray-200">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-50"></div>
        <h1 className="relative text-4xl font-extrabold mb-4 text-gray-900 p-5">
          {title}
        </h1>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  </div>
);

export default DetailLayout;
