using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ProductsManagement.Data;
using ProductsManagement.Models;

namespace ProductsManagement
{
    public class IndexModel : PageModel
    {
        private readonly ProductsManagement.Data.ProductsManagementContext _context;

        public IndexModel(ProductsManagement.Data.ProductsManagementContext context)
        {
            _context = context;
        }

        public IList<Customer> Customer { get;set; }

        public async Task OnGetAsync()
        {
            Customer = await _context.Customer.ToListAsync();
        }
    }
}
