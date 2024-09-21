import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {



    const loadedUsers = useLoaderData();

    const [users,setUsers] = useState(loadedUsers)

     // স্টেট এর users এ লোড করা ডাটা গুলা থাকবে,সেগুলা কেই ম্যাপ করা আর loadedUsers কে ম্যাপ করা একই, স্টেট এ রাখার সুবিধা হলো, যদি কোনো ভাবে users ke delete করা হয় তাহলে তা স্টেট এ আপডেট হয়ে যাবে


    const handleDelete = (id) =>{

        // console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm delete!",
          })
          .then(result =>{
            if(result.isConfirmed){

                fetch(`https://coffee-server-delta.vercel.app/user/${id}`,{
                    method : 'DELETE',
                })
                .then(res=>res.json())
                .then(data=>{
                    if (data.deletedCount > 0) {
                        Swal.fire({
                          title: "Deleted!",
                          text: "User has been removed!",
                          icon: "success",
                        });
          
                        const remaining = users.filter(use => use._id !== id)
                        setUsers(remaining)
                      }
                })
                
            }
          })


    }

   

  return (
    <div>
      <div>
        <nav className="flex justify-center gap-4">
          <Link to="/addCoffee">
            <button className="btn"> Add </button>
          </Link>

          <Link to="/register">
            <button className="btn"> Register </button>
          </Link>

          <Link to="/login">
            <button className="btn"> Login </button>
          </Link>
        </nav>
      </div>

      <h1 className="text-center mt-4 text-3xl font-bold">Users {loadedUsers.length}</h1>

      <div className="overflow-x-auto">
        <table className="table mt-6">
          {/* head */}
          <thead className="text-xl text-black">
            <tr>
              <th></th>
              <th>Email</th>
              <th>Creation Time</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>
            {/* row 1 */}

            {
                users.map((user,index) =>   <tr key={user._id}>
                    <th>{index+1}</th>
                    <td>{user.email}</td>
                    <td>{user.createdAt}</td>
                    <td>
                        <button onClick={()=> handleDelete(user._id)} className="btn">X</button>
                    </td>
                  </tr>)
            }
          
       
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
