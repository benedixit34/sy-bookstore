import { useSearchParams } from "next/navigation"



export function Message() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success")
  const errorDescription = searchParams.get("error_description");
  if (error){
     return (
      <span className="font-[lexend] text-center text-red-700 mt-4">
        {decodeURIComponent(errorDescription || "An unknown error occurred.")}
      </span>
  );
  }

  if (success){
    return (
      <span className="font-[lexend] text-center text-[#53007B] mt-4">
        {decodeURIComponent(success || "Login was successful")}
      </span>
  );

  }
  return null

 
}