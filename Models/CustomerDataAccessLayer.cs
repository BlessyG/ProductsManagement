using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductsManagement.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsManagement.Models
{
    public class CustomerDataAccessLayer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {

            using (var context = new ProductsManagementContext(
                 serviceProvider.GetRequiredService<
                     DbContextOptions<ProductsManagementContext>>()))
            {
                // Look for any Customers.
                if (context.Customer.Any())
                {
                    return;   // DB has been seeded
                }
                context.Customer.AddRange(
                    new Customer
                    {
                        Name = "Blessy",
                        Address = "Auckland CIty"
                    },

                    new Customer
                    {
                        Name = "Kingsley",
                        Address = "Auckland CIty"
                    },

                    new Customer
                    {
                        Name = "Reilon",
                        Address = "Auckland CIty"
                    },

                    new Customer
                    {
                        Name = "Samuelraj",
                        Address = "Auckland CIty"
                    }
                );
                context.SaveChanges();
            }

        }
        //new code here

        //public IEnumerable<Customer> GetAllCustomers()

        //{
        //    using (var context = new ProductsManagementContext())
        //    {
        //        try

        //        {

        //            return context.Customer.ToList();

        //        }

        //        catch

        //        {

        //            throw;

        //        }
        //    }
        //}

        ////To Add new Customer record     

        //public int AddCustomer(Customer customer)

        //{
        //    using (var context = new ProductsManagementContext())
        //    {
        //        try

        //        {

        //            context.Customer.Add(customer);

        //            context.SaveChanges();

        //            return 1;

        //        }

        //        catch

        //        {

        //            throw;

        //        }
        //    }
        //}

        ////To Update the records of a particluar Customer    

        //public int UpdateCustomer(Customer customer)

        //{
        //    using (var context = new ProductsManagementContext())
        //    {
        //        try

        //        {

        //            context.Entry(customer).State = EntityState.Modified;

        //            context.SaveChanges();

        //            return 1;

        //        }

        //        catch

        //        {

        //            throw;

        //        }
        //    }
        //}

        ////Get the details of a particular Customer    

        //public Customer GetCustomerData(int id)

        //{
        //    using (var context = new ProductsManagementContext())
        //    {
        //        try

        //        {

        //            Customer customer = context.Customer.Find(id);

        //            return customer;

        //        }

        //        catch

        //        {

        //            throw;

        //        }
        //    }
        //}

        ////To Delete the record of a particular Customer    

        //public int DeleteCustomer(int id)

        //{
        //    using (var context = new ProductsManagementContext())
        //    {
        //        try

        //        {

        //            Customer customer = context.Customer.Find(id);

        //            context.Customer.Remove(customer);

        //            context.SaveChanges();

        //            return 1;

        //        }

        //        catch

        //        {

        //            throw;

        //        }
        //    }
        //}
    }
}
