
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  uid: string;
  lastLogin: string;
}

const ProfileHeader = ({ uid, lastLogin }: ProfileHeaderProps) => {
  const copyUID = () => {
    navigator.clipboard.writeText(uid);
    toast.success("UID copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center pt-4">
      <div className="w-20 h-20 bg-gray-300 rounded-full mb-3 overflow-hidden">
        <img
          src="/lovable-uploads/42dbdaac-2f43-4be7-8960-25e847403cce.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">MEMBERNNGWRTRH</h2>
      <div className="flex items-center gap-2">
        <span>UID: {uid}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 h-8 w-8"
          onClick={copyUID}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm mt-1">Last login: {lastLogin}</p>
    </div>
  );
};

export default ProfileHeader;
