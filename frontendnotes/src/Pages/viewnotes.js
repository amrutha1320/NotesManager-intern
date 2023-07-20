import React,{useState,useEffect} from 'react';   //useeffect-- used for getting the data from the API
import DashboardNavbar from '../Components/DashboardNavbar';
import Cookies from 'universal-cookie';

const cookies =new Cookies();

function Viewnotes() {
    const [notes,setNotes]=useState([]);
    useEffect(() =>{
        const fetchdata = async () =>{
            const response=await fetch('http://127.0.0.1:2000/viewusernotes?username='+cookies.get('username'));
            const data=await response.json(); //wait until the data is stored in json format
            setNotes(data['status']);  //storing the data in the status
        }

        fetchdata();
    },[]); //initial value is []   step by step the values are appended value by value .
    return (
        <div>
            <DashboardNavbar/>
            <div className='container col-sm-6'><br/>
                <h1 style={{color:"blue"}}>View notes</h1>
                <table className='table table-bordered'>    
                    <thead>  
                        <tr>
                        <th>S.no</th>
                        <th>Notes</th>
                        <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //note is nothng but what we have inserted ,key is nothing but index
                            notes.map((note,key) => //for printing the data
                                <tr key={key}>
                                    <td className='table-data'>{key}</td>
                                    <td className='table-data'>{note.notes}</td>
                                    <td className='table-data'>{note.owner}</td>
                                </tr>

                            )
                        }
                    

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Viewnotes;