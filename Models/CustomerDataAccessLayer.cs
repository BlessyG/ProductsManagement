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
    }
}
