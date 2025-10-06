import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Phone, FileText, Briefcase } from 'lucide-react';
import { Badge } from '../ui/badge';

const FilteredCandidates = () => {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = localStorage.getItem('filteredResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect back if no results found
      navigate('/admin/companies');
    }
  }, [navigate]);

  const handleBack = () => {
    localStorage.removeItem('filteredResults');
    navigate('/admin/companies');
  };

  const exportToCSV = () => {
    if (!results || !results.filteredApplicants) return;

    const headers = ['Name', 'Email', 'Phone', 'Skills', 'Job Title', 'Applied Date'];
    const rows = results.filteredApplicants.map(app => [
      app.applicant?.fullName || 'N/A',
      app.applicant?.email || 'N/A',
      app.applicant?.phoneNumber || 'N/A',
      app.applicant?.profile?.skills?.join(', ') || 'N/A',
      app.jobTitle || 'N/A',
      new Date(app.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filtered-candidates-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const { filteredApplicants, matchingJobs, totalApplicants, totalJobs } = results;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                Filtered Candidates
              </h1>
              <p className="text-gray-600 mt-1">
                Found {filteredApplicants?.length || 0} matching candidates across {matchingJobs?.length || 0} job{matchingJobs?.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button
              onClick={exportToCSV}
              className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Matching Candidates</p>
              <p className="text-2xl font-bold text-teal-600">{filteredApplicants?.length || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-800">{totalApplicants || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Matching Jobs</p>
              <p className="text-2xl font-bold text-blue-600">{matchingJobs?.length || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-800">{totalJobs || 0}</p>
            </div>
          </div>

          {/* Matching Jobs List */}
          {matchingJobs && matchingJobs.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-blue-800 mb-2">
                Jobs with matching candidates:
              </p>
              <div className="flex flex-wrap gap-2">
                {matchingJobs.map((job, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {job.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Candidates Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {filteredApplicants && filteredApplicants.length > 0 ? (
            <Table>
              <TableCaption>Candidates matching your search criteria</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Job Applied</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.map((app, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {app.applicant?.fullName || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {app.applicant?.email || 'N/A'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="w-3 h-3" />
                          <a 
                            href={`mailto:${app.applicant?.email}`}
                            className="hover:text-teal-600"
                          >
                            Email
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{app.applicant?.phoneNumber || 'N/A'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {app.applicant?.profile?.skills?.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        )) || <span className="text-gray-500 text-sm">No skills listed</span>}
                        {app.applicant?.profile?.skills?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{app.applicant.profile.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{app.jobTitle || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.applicant?.profile?.resume ? (
                        <a
                          href={app.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm"
                        >
                          <FileText className="w-4 h-4" />
                          View
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">No resume</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          app.status === 'accepted' ? 'default' :
                          app.status === 'rejected' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {app.status || 'pending'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">No candidates found matching your criteria.</p>
              <Button onClick={handleBack} className="mt-4">
                Go Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredCandidates;

