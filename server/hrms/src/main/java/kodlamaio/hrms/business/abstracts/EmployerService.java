package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Employer;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.EmployerDto;

import java.util.List;

public interface EmployerService {
    List<Employer> getall();
    Result getById(int id);
    Result register(EmployerDto employerDto);
    Result MailConfirm(int id);
    Result login(String eposta,String password);
    Result updateEmployer(int id,String firstName,String lastName,int yearOfBirth,String companyName,String phoneNumber,String website);
    Result updateEmployerUpdated(int id,boolean isUpdated);
}
