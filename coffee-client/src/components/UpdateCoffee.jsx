import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateCoffee = () => {

    const updateCoffee = useLoaderData();

    const { _id, name, quantity, supplier, taste, category, details, photo } = updateCoffee;
   

    const handleUpdateCoffee = (e) => {
        e.preventDefault();
    
        const form = e.target;
    
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
    
        const updateCoffee = {
          name,
          quantity,
          supplier,
          taste,
          category,
          details,
          photo,
        };
    
        console.log(updateCoffee);
    
        // (A) send the 'newCoffee' data to the server
    
        // have to send from client to server, so have to use server side's url where the data will be stored
        fetch(`https://coffee-server-delta.vercel.app/coffee/${_id}`, {
          // request will be sent to this url
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateCoffee),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Coffee Updated Successfully",
                icon: "success",
                confirmButtonText: "Okay",
              });
            }
          });
      };

    return (
    <div>

    <nav className="flex justify-center gap-4">

      <Link to='/'> <button className="btn"> Home </button> </Link>
      <Link to='/addCoffee'> <button className="btn"> Add </button> </Link>
   
      
    </nav>


    <div className="bg-[#F4F3F0] p-24">
        <h1 className="text-3xl text-center font-extrabold text-black">
          Update <span className="text-purple-600">{name}</span> info here
        </h1>

        <form onSubmit={handleUpdateCoffee}>
          {/* coffe-name and quantity */}

          <div className="md:flex gap-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Coffee</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Coffee Name"
                  className="input input-bordered rounded-sm w-full"
                  name="name"
                  defaultValue={name}
                />
              </label>
            </div>

            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Quantity"
                  className="input input-bordered rounded-sm w-full"
                  name="quantity"
                  defaultValue={quantity}
                />
              </label>
            </div>
          </div>

          {/* supplier and taste */}

          <div className="md:flex gap-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Supplier</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Supplier Name"
                  className="input input-bordered rounded-sm w-full"
                  name="supplier"
                  defaultValue={supplier}
                />
              </label>
            </div>

            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Taste</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Taste"
                  className="input input-bordered rounded-sm w-full"
                  name="taste"
                  defaultValue={taste}
                />
              </label>
            </div>
          </div>

          {/* category and details */}

          <div className="md:flex gap-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered rounded-sm w-full"
                  name="category"
                  defaultValue={category}
                />
              </label>
            </div>

            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Details"
                  className="input input-bordered rounded-sm w-full"
                  name="details"
                  defaultValue={details}
                />
              </label>
            </div>
          </div>

          {/* photoURL */}

          <div className="md:flex gap-8">
            <div className="form-control md:w-full">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered rounded-sm w-full"
                  name="photo"
                  defaultValue={photo}
                />
              </label>
            </div>
          </div>

          <input
            type="submit"
            value="Update"
            className="btn btn-block bg-slate-500"
          />
        </form>
      </div>

  






    </div>
    );
};

export default UpdateCoffee;