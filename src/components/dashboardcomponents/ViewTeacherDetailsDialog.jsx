import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin } from "lucide-react";

export function ViewTeacherDetailsDialog({ isOpen, onClose, teacher }) {
  if (!teacher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[350px] p-0 overflow-hidden">
        <div className="relative bg-white p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt={teacher.name}
              />
              <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl font-bold">
              {teacher.name}
            </DialogTitle>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-medium">{teacher.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-medium">{teacher.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-medium">
                {teacher.phone || "+123 456 7890"}
              </span>{" "}
              {/* Placeholder phone */}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-medium">{teacher.location}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
