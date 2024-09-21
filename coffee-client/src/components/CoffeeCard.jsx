
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
  const { _id, name, quantity, supplier, taste, photo } = coffee;



  // (D) this is delete part
  const handleDelete = (_id) => {
    
    // console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm delete!",
    }).then((result) => {
      if (result.isConfirmed) {

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });

// ডিলিটে ক্লিক করার পর যখন কনফার্ম করবে তখন ই ফেচ এ যাবে আর সেখানে ডিলিট অপারেশন চালাবে ডিলি মেথড ইউজ করে
        fetch(`https://coffee-server-delta.vercel.app/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been removed!",
                icon: "success",
              });

              const remaining = coffees.filter(cof => cof._id !== _id)
              setCoffees(remaining)
            }

          });

      }
    });
  };
  return (
    <div className="card card-side bg-base-100 shadow-xl p-4">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="w-full flex justify-between p-4">
        <div className="space-y-2">
          <h2 className="card-title">{name}</h2>
          <p>Quantity :{quantity}</p>
          <p>Supplier :{supplier}</p>
          <p>Taste : {taste}</p>
        </div>

        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-3">

            <button className="btn join-item">View</button>

            <Link to={`/updateCoffee/${_id}`}> <button className="btn join-item">Edit</button> </Link>

            <button
              onClick={() => handleDelete(_id)}
              className="btn join-item bg-red-600"
            >
              Delete
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
