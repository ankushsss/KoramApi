import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import contries from "countries-api"
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, FilledInput, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
// import { axiosPost } from 'src/axiosMethod/axiosPost';
// ----------------------------------------------------------------------

export default function AddRoom(props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    name:"",
    category:"",
    subCategory:"",
    superCategory:"",
  })
  const [contryList, setCountryList] = useState([])
  
  const [southAmerica, setSouthAmerica] = useState([])
  const [northAmerica, setNorthAmerica] = useState([])
  const [australia, setAustralia] = useState([])
useState(()=>{
  const fil = contries.findByRegion("Americas").data
  const samerica = fil.filter((data)=>{
     return data.subregion === "South America"
   })
   setSouthAmerica(samerica)
   const namerica = fil.filter((data)=>{
    return data.subregion !== "South America"

  })
  setNorthAmerica(namerica)
   setAustralia(contries.findByRegion("Oceania").data)
 






    if(props.singleRoom)
    {
   setInputData({name:props.singleRoom.name,
    category:props.singleRoom.category,
    subCategory:props.singleRoom.subCategory,
    superCategory:props.singleRoom.superCategory})
   }
   

},[])

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
 function setCoun (){
  
    // setCountryList(contries.findByRegion(inputData.category).data)
    if(inputData.category === "South America")
    {
      setCountryList(southAmerica)
    }
    else if(inputData.category === "North America")
    {
      setCountryList(northAmerica)
    }
    else if(inputData.category === "Australia")
    {
      setCountryList(australia)
    }
    else
    {
      setCountryList(contries.findByRegion(inputData.category).data)
    }

 
 }


useEffect(()=>{
  console.log(inputData.Category)
  // console.log(contries.findByRegion("Americas").data)
  setCoun()
  
},[inputData.category])
 

console.log(props)

  const onSubmit = async () => {
    console.log(inputData)
    const formData = new FormData();
    formData.append("name",inputData.name);
    formData.append("category",inputData.category);
    formData.append("subCategory",inputData.subCategory);
    formData.append("superCategory",inputData.superCategory);
   
    if(!props.singleRoom)
    {
    axios.post(`http://www.koram.in:3000/api/v1/addchatrooms`,inputData).then(
      (res)=>{
          console.log(res)
          props.setRightDrawer({"right":false})
          props.setAlertMssg({open:true,messege:"successfully room add",type:"success"})
          props.reload()
      }
    ).catch((err)=>{
      console.log(err)
      props.setRightDrawer({"right":false})
      props.setAlertMssg({open:true,messege:err.messege,type:"error"})

    })
    }
else
{
    formData.append("_id",props.singleRoom._id)
    axios.post(`http://www.koram.in:3000/api/v1/editchatrooms`,{data:inputData,_id:props.singleRoom._id}).then(
        (res)=>{
            console.log(res)
             props.setRightDrawer({"right":false})
             props.setAlertMssg({open:true,messege:"successfully room edit",type:"success"})
             props.reload()
        }).catch((err)=>{
          props.setRightDrawer({"right":false})
          props.setAlertMssg({open:true,messege:err.messege,type:"error"})
          
        })
}
  };

  const handleTextChange = (e)=>{
     const name = e.target.name
     const value = e.target.name === "image"?e.target.files[0]:e.target.value

     setInputData({...inputData,[name]:value})
  }

  return (
    <>
    { console.log(northAmerica,"okli")}
      <Stack spacing={3}>
        <TextField
          id="outlined-multiline-flexible"
          label="Name"
          name="name"
          multiline
          maxRows={4}
          value={inputData.name}
          onChange={handleTextChange}
        />


      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-Category-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-Category-label"
          id="demo-simple-select"
          name="category"
          value={inputData.category}
          label=" category"
          onChange={handleTextChange}
        >
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="North America">North America</MenuItem>
          <MenuItem value="South America">South America</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
        </Select> 

      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-subCategory-label">Sub Category</InputLabel>
        <Select
          labelId="demo-simple-select-subCategory-label"
          id="demo-simple-select"
          name="subCategory"
          value={inputData.subCategory}
          label="Sub Category"
          onChange={handleTextChange}
        >
          {
            contryList.map((data)=>{
              return <MenuItem key={data.name.common} value={data.name.common}>{data.name.common}</MenuItem>
            })
          }
       
        </Select> 

      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Super Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="superCategory"
          value={inputData.superCategory}
          label="Super Category"
          onChange={handleTextChange}
        >
          <MenuItem value="By Location">By Location</MenuItem>
          <MenuItem value="By Interest">By Interest</MenuItem>
          <MenuItem value="Trending">Trending</MenuItem>
        </Select> 

      </FormControl>
        
        <br/>
      
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
        Edit
      </LoadingButton>
      </>
  );
}
