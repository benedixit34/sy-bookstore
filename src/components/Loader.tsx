export function LoadingMsg({ msg }: { msg: string }){

    return (
      <>
        <div className="flex items-center justify-center h-screen font-[lexend]">
          <p className="text-gray-500">{msg}</p>
        </div>
  
      </>
    );
  }
