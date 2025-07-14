import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

// Sample student data
const allStudents = [
  { id: 1, firstName: "Daniel", lastName: "Anderson" },
  { id: 2, firstName: "Sarah", lastName: "Davis" },
  { id: 3, firstName: "Michael", lastName: "Miller" },
  { id: 4, firstName: "David", lastName: "Juliet" },
  { id: 5, firstName: "William", lastName: "Smith" },
  { id: 6, firstName: "Emma", lastName: "Johnson" },
  { id: 7, firstName: "James", lastName: "Brown" },
  { id: 8, firstName: "Olivia", lastName: "Wilson" },
  { id: 9, firstName: "Benjamin", lastName: "Moore" },
  { id: 10, firstName: "Sophia", lastName: "Taylor" },
  { id: 11, firstName: "Lucas", lastName: "Anderson" },
  { id: 12, firstName: "Isabella", lastName: "Thomas" },
  { id: 13, firstName: "Mason", lastName: "Jackson" },
  { id: 14, firstName: "Mia", lastName: "White" },
  { id: 15, firstName: "Ethan", lastName: "Harris" },
  { id: 16, firstName: "Charlotte", lastName: "Martin" },
  { id: 17, firstName: "Alexander", lastName: "Garcia" },
  { id: 18, firstName: "Amelia", lastName: "Rodriguez" },
  { id: 19, firstName: "Henry", lastName: "Lewis" },
  { id: 20, firstName: "Harper", lastName: "Lee" },
  { id: 21, firstName: "Sebastian", lastName: "Walker" },
  { id: 22, firstName: "Evelyn", lastName: "Hall" },
  { id: 23, firstName: "Jack", lastName: "Allen" },
  { id: 24, firstName: "Abigail", lastName: "Young" },
  { id: 25, firstName: "Owen", lastName: "Hernandez" },
  { id: 26, firstName: "Emily", lastName: "King" },
  { id: 27, firstName: "Liam", lastName: "Wright" },
  { id: 28, firstName: "Elizabeth", lastName: "Lopez" },
  { id: 29, firstName: "Noah", lastName: "Hill" },
  { id: 30, firstName: "Avery", lastName: "Scott" },
  { id: 31, firstName: "Oliver", lastName: "Green" },
  { id: 32, firstName: "Scarlett", lastName: "Adams" },
  { id: 33, firstName: "Elijah", lastName: "Baker" },
  { id: 34, firstName: "Madison", lastName: "Gonzalez" },
];

const ITEMS_PER_PAGE = 8;

export default function GroupDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredStudents = allStudents.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDeleteGroup = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteGroup = () => {
    console.log("Group deleted");
    setShowDeleteModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#2C6E3E] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5 cursor-pointer" />
            <span className="text-lg font-medium">Group Details</span>
          </div>
          <Button
            onClick={handleDeleteGroup}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Delete Group
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto">
        {/* Profile Section */}
        <div className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Zodiack"
              />
              <AvatarFallback className="bg-gray-300 text-gray-600 text-lg font-semibold">
                Z
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Zodiack</h2>
              <p className="text-gray-600">tmoe.zodiack@gmail.com</p>
              <p className="text-gray-600">Phone: 86560349</p>
            </div>
          </div>
        </div>

        {/* Students Section */}
        <div>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Student({filteredStudents.length})
              </h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Name or ID"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-4 h-10 border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#2C6E3E] hover:bg-[#2C6E3E]">
                  <TableHead className="text-white font-medium text-center">
                    #SL
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    First Name
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Last Name
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-center">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.firstName}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.lastName}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-8 text-gray-500"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              className={`${
                                currentPage === page
                                  ? "bg-[#2C6E3E] text-white hover:bg-[#245A33]"
                                  : ""
                              }`}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this group? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteGroup}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
