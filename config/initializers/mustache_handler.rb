class MustacheRails < Mustache

  def initialize(view_context, template_source)
    @view_context = view_context
    self.template = template_source
    assign_variables!
  end

  def respond_to?(method_sym, include_private = false)
    if @view_context.respond_to?(method_sym) 
      true
    else
      super
    end
  end

  def method_missing(method_name, *args, &block)
    @view_context.send(method_name,*args, &block)
  end

  private
  def assign_variables!
    variables = @view_context.instance_variable_names.select{|name| name =~ /^@[^_]/}
    variables.each do |name|
      singleton_class.class_eval do
        define_method name.tr('@','') do
          @view_context.instance_variable_get(name)
        end
      end
    end
  end
end

class MustacheHandler < ActionView::Template::Handler
  include ActionView::Template::Handlers::Compilable

  self.default_format = :mustache

  def compile(template)
    mustache_class_name = "#{template.virtual_path}_view".classify
    mustache_class = mustache_class_name.constantize
    "#{mustache_class}.new(self, '#{template.source}').render.html_safe"
  end
end

ActionView::Template.register_template_handler(:mustache, MustacheHandler)