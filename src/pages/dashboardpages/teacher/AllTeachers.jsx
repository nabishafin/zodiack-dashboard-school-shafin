import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";

import { AddTeacherDialog } from "@/components/dashboardcomponents/AddTeacherDialog";
import { EditTeacherDialog } from "@/components/dashboardcomponents/EditTeacherDialog";
import { ViewTeacherDetailsDialog } from "@/components/dashboardcomponents/ViewTeacherDetailsDialog";

const AllTeachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [teachersData, setTeachersData] = useState([
    {
      id: 1,
      serialId: "T001",
      name: "John Cooper",
      email: "jbc@gmail.com",
      location: "UK",
      status: "Active",
    },
    {
      id: 2,
      serialId: "T002",
      name: "Jane Smith",
      email: "jane@gmail.com",
      location: "USA",
      status: "Active",
    },
    {
      id: 3,
      serialId: "T003",
      name: "Mike Johnson",
      email: "mike@gmail.com",
      location: "Canada",
      status: "Inactive",
    },
    {
      id: 4,
      serialId: "T004",
      name: "Sarah Williams",
      email: "sarah@gmail.com",
      location: "Australia",
      status: "Active",
    },
    {
      id: 5,
      serialId: "T005",
      name: "David Brown",
      email: "david@gmail.com",
      location: "New Zealand",
      status: "Active",
    },
    {
      id: 6,
      serialId: "T006",
      name: "Emily Davis",
      email: "emily@gmail.com",
      location: "Ireland",
      status: "Active",
    },
    {
      id: 7,
      serialId: "T007",
      name: "Robert Wilson",
      email: "robert@gmail.com",
      location: "Scotland",
      status: "Inactive",
    },
    {
      id: 8,
      serialId: "T008",
      name: "Lisa Anderson",
      email: "lisa@gmail.com",
      location: "Wales",
      status: "Active",
    },
    {
      id: 9,
      serialId: "T009",
      name: "James Taylor",
      email: "james@gmail.com",
      location: "England",
      status: "Active",
    },
    {
      id: 10,
      serialId: "T010",
      name: "Maria Garcia",
      email: "maria@gmail.com",
      location: "Spain",
      status: "Active",
    },
    {
      id: 11,
      serialId: "T011",
      name: "Linda Martinez",
      email: "linda@gmail.com",
      location: "Mexico",
      status: "Active",
    },
    {
      id: 12,
      serialId: "T012",
      name: "Daniel Lee",
      email: "daniel@gmail.com",
      location: "Singapore",
      status: "Inactive",
    },
    {
      id: 13,
      serialId: "T013",
      name: "Laura Kim",
      email: "laura@gmail.com",
      location: "South Korea",
      status: "Active",
    },
    {
      id: 14,
      serialId: "T014",
      name: "Chris Evans",
      email: "chris@gmail.com",
      location: "USA",
      status: "Active",
    },
    {
      id: 15,
      serialId: "T015",
      name: "Nina Patel",
      email: "nina@gmail.com",
      location: "India",
      status: "Inactive",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = teachersData.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  const handleAction = (action, teacher) => {
    setSelectedTeacher(teacher);
    if (action === "view") setIsViewModalOpen(true);
    else if (action === "edit") setIsEditModalOpen(true);
    else if (action === "delete") setIsDeleteConfirmOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddTeacher = (newTeacher) => {
    setTeachersData((prev) => [...prev, newTeacher]);
  };

  const handleSaveTeacher = (updatedTeacher) => {
    setTeachersData((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
    );
  };

  const handleDeleteTeacher = () => {
    setTeachersData((prev) => prev.filter((t) => t.id !== selectedTeacher.id));
    setIsDeleteConfirmOpen(false);
    setSelectedTeacher(null);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <Button
          key="prev"
          size="sm"
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          size="sm"
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className={`h-8 w-8 p-0 ${
            currentPage === i ? "bg-[#2C6E3E] text-white" : ""
          }`}
        >
          {i}
        </Button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <Button
          key="next"
          size="sm"
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#2C6E3E] text-white p-5 rounded-sm">
        <h2 className="text-lg font-semibold">All Teacher</h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Total Teachers ({filteredTeachers.length})
          </span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#2C6E3E] hover:bg-[#245530] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <div className="overflow-hidden ">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#2C6E3E] hover:bg-[#2C6E3E] ">
              {[
                "Serial ID",
                "User Name",
                "Email",
                "Address",
                "Status",
                "Action",
              ].map((head, idx) => (
                <TableHead
                  key={idx}
                  className="text-white text-center font-medium py-3 px-4  border-green-600"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTeachers.length > 0 ? (
              currentTeachers.map((teacher) => (
                <TableRow key={teacher.id} className="hover:bg-gray-50">
                  <TableCell className="text-center py-3 px-4 ">
                    {teacher.serialId}
                  </TableCell>
                  <TableCell className="text-center py-3 px-4 ">
                    {teacher.name}
                  </TableCell>
                  <TableCell className="text-center py-3 px-4 ">
                    {teacher.email}
                  </TableCell>
                  <TableCell className="text-center py-3 px-4 ">
                    {teacher.location}
                  </TableCell>
                  <TableCell className="text-center py-3 px-4 ">
                    <span
                      className={`${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      } px-2 py-1 rounded-full text-xs font-medium`}
                    >
                      {teacher.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                          onClick={() => handleAction("view", teacher)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("edit", teacher)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("delete", teacher)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No teachers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {renderPaginationButtons()}
        </div>
      )}

      {/* Modals */}
      <AddTeacherDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTeacher={handleAddTeacher}
      />
      <EditTeacherDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        teacher={selectedTeacher}
        onSaveTeacher={handleSaveTeacher}
      />
      <ViewTeacherDetailsDialog
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        teacher={selectedTeacher}
      />

      {/* Delete Confirm */}
      <AlertDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this teacher? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeacher}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllTeachers;
