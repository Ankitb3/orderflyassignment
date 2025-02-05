import { ShineBorder } from "@/components/ui/shine-border";

const UserCard = ({ user, onClick }) => {
    return (
      <ShineBorder
              className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
      <li
        className="p-2 cursor-pointer hover:bg-gray-200 border-b"
        onClick={onClick}
      >
         
        <p><strong>{user.name}</strong> ({user.email})</p>
        <p>{user.address.street}, {user.address.city}</p>
        <p><em>{user.company.name}</em></p>
      </li>
      </ShineBorder>
    );
  };
  
  export default UserCard;