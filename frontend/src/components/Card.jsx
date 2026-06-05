function Card({ title, amount }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-52">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2 text-green-600">
        ₹{amount}
      </p>

    </div>
  );
}

export default Card;