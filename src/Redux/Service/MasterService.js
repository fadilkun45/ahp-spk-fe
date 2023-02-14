import axios from "axios";

const config = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
}

const BaseUrl = process.env.REACT_APP_API_URL



export const getUser = async (params, body) => {
  try {
    let data = await axios.get(`${BaseUrl}/pusat-kontrol-akun${params || ''}`).then(({ data }) => data.data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const getDataKriteria = async (params) => {
  try {
    let data =  await axios.get(`${BaseUrl}/pusat-kontrol-ahp/kriteria${params || ''}`).then((res) => res.data)
    return data.data
  } catch (error) {
    throw new Error(error.response.data?.message)
  }
}

export const getDataPerbandingan = async (params) => {
  try {
    let data =  await axios.get(`${BaseUrl}/pusat-kontrol-ahp/dropdown/perbandingan${params || ''}`).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const postKriteria = async (body) => {
  try {
    let data =  await axios.post(`${BaseUrl}/pusat-kontrol-ahp/kriteria`,body).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const getKriteriaNewDropdown = async (params,body) => {
  try {
    let data =  await axios.get(`${BaseUrl}/pusat-kontrol-ahp/kriteria/dropdown`).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}


export const postPerbandingan = async (body) => {
  try {
    let data =  await axios.put(`${BaseUrl}/pusat-kontrol-ahp/kriteria/perbandingan`,body).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}


export const DeleteKriteria = async (param,body) => {
  try {
    let data =  await axios.delete(`${BaseUrl}/pusat-kontrol-ahp/kriteria/${param}`,body).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}



export const postIntesitas = async (body) => {
  try {
    let data =  await axios.post(`${BaseUrl}/pusat-kontrol-ahp/intensitas`,body).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const getDataSesi = async(params) => {
  try {
    let data =  await axios.get(`${BaseUrl}/pusat-kontrol-sesi${params || ''}`).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const DeleteSesi = async (idSesi) => {
  try {
    let data =  await axios.delete(`${BaseUrl}/pusat-kontrol-sesi/${idSesi}`).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const postSesi = async (body) => {
  try {
    let data =  await axios.post(`${BaseUrl}/pusat-kontrol-sesi`, body).then((res) => res.data)
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const getDataKandidatBelumDinilai = async (idSeniorProgrammer) => {
  try {
    let dataKandidatBelumDinilai =  await axios.get(`${BaseUrl}/kandidat-belum-dinilai/${idSeniorProgrammer}`).then((res) => res.data);
    
    let dataKandidatSudahDinilai =  await axios.get(`${BaseUrl}/kandidat-sudah-dinilai/${idSeniorProgrammer}`).then((res) => res.data);

    return {
      dataKandidatBelumDinilai: dataKandidatBelumDinilai?.data,
      dataKandidatSudahDinilai: dataKandidatSudahDinilai?.data
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}

export const getDataKandidatSudahDinilai = async (idSeniorProgrammer) => {
  try {
    console.log(idSeniorProgrammer)
    console.log('here')
    let data =  await axios.get(`${BaseUrl}/kandidat-sudah-dinilai/${idSeniorProgrammer}`).then((res) => res.data);
    return data?.data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data?.message)
  }
}