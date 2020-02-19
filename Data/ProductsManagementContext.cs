using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductsManagement.Models;

namespace ProductsManagement.Data
{
    public class ProductsManagementContext : DbContext
    {

        public ProductsManagementContext(DbContextOptions<ProductsManagementContext> options)
           : base(options)
        {
        }
        public DbSet<ProductsManagement.Models.Customer> Customer { get; set; }

        public DbSet<ProductsManagement.Models.Product> Product { get; set; }
    }
}
