module ApplicationHelper
  def html_class
    "#{controller.controller_name}-#{controller.action_name}"
  end
end
