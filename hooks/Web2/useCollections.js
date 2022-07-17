import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchCollectionData = async ({ }) => {
  const { data } = await http.get('/collection');
  return data;
};
const fetchCollectionDataTrending = async ({ }) => {
  const { data } = await http.get('/collection/tranding?limit=10');
  return data;
};

const fetchMoralisCollection = async ({ queryKey }) => {
  const { data } = await http.post('/moralis/getCollection', queryKey[1]);
  localStorage.setItem('collection', JSON.stringify(data));
  const objectafter = localStorage.getItem('collection');
  console.log('afterset', objectafter)
  return data;
};
const fetchMoralisNFTS = async ({ queryKey }) => {
  const { data } = await http.post('/moralis/getNft', queryKey[1]);
  return data;
};
const fetchCollectionByid = async ({ queryKey }) => {
  if (queryKey[1]?.id == undefined) {
    return {};
  }
  const { data } = await http.get(`/collection/${queryKey[1].id}`);
  return data
};
const
  useCollections = (options = {}) => {
  return useQuery([`collection`, options], fetchCollectionData, {
    keepPreviousData: true,
  });
};
const useCollectionsTrending = (options = {}) => {
  return useQuery([`useCollectionsTrending`, options], fetchCollectionDataTrending, {
    keepPreviousData: true,
  });
};
const useMoralisCollections = (options = {}) => {
  return useQuery([`collectionmoralis`, options], fetchMoralisCollection, {
    keepPreviousData: true,
    staleTime: 50000
  });
};
const useMoralisCollectionsLazy = (options = {}) => {
  return useQuery([`collectionmoralis`, options], fetchMoralisCollection, {
    keepPreviousData: true,
    enabled: false
  });
};
const useMoralisNFTS = (options = {}) => {
  return useQuery([`nftsmoralis`, options], fetchMoralisNFTS, {
    keepPreviousData: true,
  });
};
const useGetCollectionByID = (options = {}) => {
  return useQuery([`collection_id_${options?.id}`, options], fetchCollectionByid, {
    keepPreviousData: true,
  });
};
export {
  useCollections,
  useMoralisCollections,
  useMoralisNFTS,
  useCollectionsTrending,
  useMoralisCollectionsLazy,
  useGetCollectionByID
};
